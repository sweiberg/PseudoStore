package trend

import (
	"pseudo-store/db"
)

type Result struct {
	OrderMonth  string
	TotalOrders int
}

func TrendOne() ([]Result, error) {
	var results []Result

	err := db.Oracle.Raw(`
	SELECT
		TO_CHAR(o.CREATED_AT, 'YYYY-MM') AS Order_Month,
		COUNT(*) AS Total_Orders
	FROM
		ORDERS o
	INNER JOIN 
		MEMBERS m ON o.MEMBER_ID = m.ID
	INNER JOIN 
		PRODUCTS p ON o.PRODUCT_ID = p.ID
	INNER JOIN 
		CATEGORIES c ON p.CATEGORY_ID = c.ID
	INNER JOIN 
		SUBCATEGORIES s ON p.SUBCATEGORY_ID = s.ID
	WHERE
		c.NAME = 'Apparel' AND
		s.NAME = 'Topwear' AND
		TRUNC(MONTHS_BETWEEN(SYSDATE, m.BIRTHDATE) / 12) BETWEEN 25 AND 34 AND
		m.GENDER = 'M' AND
		m.MUNICIPALITY = 'Sumatera Barat' AND
		o.CREATED_AT BETWEEN TO_DATE('2017-01', 'YYYY-MM') AND TO_DATE('2018-01', 'YYYY-MM')
	GROUP BY
		TO_CHAR(o.CREATED_AT, 'YYYY-MM')
	ORDER BY
		Order_Month`).Scan(&results).Error

	if err != nil {
		return nil, err
	}

	return results, nil
}
