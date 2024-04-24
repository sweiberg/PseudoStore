package trend

import "pseudo-store/db"

type TrendFive struct {
	OrderMonth string
	Method     string
	MultiCount int
}

func GetTrendFive(season string, categoryName string, lowDate string, highDate string, itemCount int) ([]TrendFive, error) {
	var results []TrendFive

	err := db.Oracle.Raw(`
		SELECT 
			TO_CHAR(o.created_at, 'YYYY-MM') AS Order_Month,
			pm.Method, COUNT(DISTINCT o.ID) AS Multi_Count
		FROM 
			orders o
		JOIN 
			Products p ON o.Product_ID = p.ID 
		JOIN 
			Payments pm ON o.ID = pm.Order_ID
		JOIN 
			Categories c ON p.Category_ID = c.ID
		WHERE 
			Line_Number > ?
		AND 
			p.Season = ?
		AND 
			c.Name = ?
		AND 
			o.created_at BETWEEN TO_DATE(?, 'YYYY-MM') AND TO_DATE(?, 'YYYY-MM')
		GROUP BY 
			TO_CHAR(o.created_at, 'YYYY-MM'), pm.Method
		ORDER BY 
			Order_Month, Multi_Count DESC
	`, itemCount, season, categoryName, lowDate, highDate).Scan(&results).Error

	if err != nil {
		return nil, err
	}

	return results, nil
}
