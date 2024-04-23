package trend

import "pseudo-store/db"

type TrendTwo struct {
	OrderMonth           string
	Municipality         string
	NewMembers           int
	PrevMonthNewMembers  int
	OrderCount           int
	PrevMonthOrderCount  int
	NewMembersGrowthRate float64
	OrderCountGrowthRate float64
}

func GetTrendTwo(municipality string, lowDate string, highDate string) ([]TrendTwo, error) {
	var results []TrendTwo

	err := db.Oracle.Raw(`
		WITH MonthlyData AS (
			SELECT 
				TO_CHAR(m.CREATED_AT, 'YYYY-MM') AS Order_Month,
				m.MUNICIPALITY AS Municipality,
				COUNT(DISTINCT m.ID) AS New_Members,
				COUNT(DISTINCT o.ID) AS Order_Count
			FROM 
				MEMBERS m
				LEFT JOIN ORDERS o ON m.ID = o.MEMBER_ID AND TO_CHAR(m.CREATED_AT, 'YYYY-MM') = TO_CHAR(o.CREATED_AT, 'YYYY-MM')
			GROUP BY 
				TO_CHAR(m.CREATED_AT, 'YYYY-MM'),
				m.MUNICIPALITY
		)
		SELECT 
			md.Order_Month,
			md.Municipality,
			md.New_Members,
			NVL(pd.New_Members, 0) AS Prev_Month_New_Members,
			md.Order_Count,
			NVL(pd.Order_Count, 0) AS Prev_Month_Order_Count,
			ROUND(GREATEST(NVL((md.New_Members - NVL(pd.New_Members, 0)) / NULLIF(NVL(pd.New_Members, 1), 0) * 100, 0), 0), 2) AS New_Members_Growth_Rate,
			ROUND(GREATEST(NVL((md.Order_Count - NVL(pd.Order_Count, 0)) / NULLIF(NVL(pd.Order_Count, 1), 0) * 100, 0), 0), 2) AS Order_Count_Growth_Rate
		FROM 
			MonthlyData md
		LEFT JOIN 
			MonthlyData pd ON md.Municipality = pd.Municipality AND 
				ADD_MONTHS(TO_DATE(md.Order_Month, 'YYYY-MM'), -1) = TO_DATE(pd.Order_Month, 'YYYY-MM')
		WHERE
			md.Order_Month BETWEEN ? AND ?
			AND md.Municipality = ?
		ORDER BY 
			md.Order_Month, md.Municipality
	`, lowDate, highDate, municipality).Scan(&results).Error

	if err != nil {
		return nil, err
	}

	return results, nil
}
