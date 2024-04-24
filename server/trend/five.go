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
			TO_CHAR(o.Created_At, 'YYYY-MM') 
			AS Order_Month, pm.Method, COUNT(DISTINCT o.ID) 
			AS Multi_Count
		FROM 
			Categories c
		JOIN 
			Products p ON c.ID = p.Category_ID
		JOIN 
			Orders o ON p.ID = o.Product_ID
		JOIN 
			Payments pm ON o.ID = pm.Order_ID
		WHERE 
			o.Created_At BETWEEN TO_DATE(?, 'YYYY-MM') AND TO_DATE(?, 'YYYY-MM')
		AND 
			p.Season = ?
		AND 
			c.Name = ?
		GROUP BY 
			c.Name, TO_CHAR(o.Created_At, 'YYYY-MM'), pm.Method
		HAVING 
			COUNT(DISTINCT o.Product_ID) > ?
		ORDER BY 
			Order_Month, Multi_Count DESC
	`, lowDate, highDate, season, categoryName, itemCount).Scan(&results).Error

	if err != nil {
		return nil, err
	}

	return results, nil
}
