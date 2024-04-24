package trend

import "pseudo-store/db"

type TrendFive struct {
	OrderMonth string
	Method     string
	MultiCount int
}

func GetTrendFive() ([]TrendFive, error) {
	var results []TrendFive

	err := db.Oracle.Raw(`
		SELECT 
			TO_CHAR(o.Created_At, 'YYYY-MM-DD') 
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
			o.Created_At BETWEEN TO_DATE('2017-01', 'YYYY-MM') AND TO_DATE('2022-01', 'YYYY-MM')
		AND 
			p.Season = 'Fall'
		AND 
			c.Name = 'Apparel'
		GROUP BY 
			c.Name, TO_CHAR(o.Created_At, 'YYYY-MM-DD'), pm.Method
		HAVING 
			COUNT(DISTINCT o.Product_ID) > 3
		ORDER BY 
			Order_Month, Multi_Count DESC;
	`).Scan(&results).Error

	if err != nil {
		return nil, err
	}

	return results, nil
}
