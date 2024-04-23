package trend

import (
	"pseudo-store/db"
)

type TrendOne struct {
	OrderMonth  string
	TotalOrders int
}

func GetTrendOne(
	catName string,
	subcatName string,
	lowAge int,
	highAge int,
	gender string,
	municipality string,
	lowDate string,
	highDate string) ([]TrendOne, error) {
	var results []TrendOne

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
			c.NAME = ? AND
			s.NAME = ? AND
			TRUNC(MONTHS_BETWEEN(SYSDATE, m.BIRTHDATE) / 12) BETWEEN ? AND ? AND
			m.GENDER = ? AND
			m.MUNICIPALITY = ? AND
			o.CREATED_AT BETWEEN TO_DATE(?, 'YYYY-MM') AND TO_DATE(?, 'YYYY-MM')
		GROUP BY
			TO_CHAR(o.CREATED_AT, 'YYYY-MM')
		ORDER BY
			Order_Month
	`, catName, subcatName, lowAge, highAge, gender, municipality, lowDate, highDate).Scan(&results).Error

	if err != nil {
		return nil, err
	}

	return results, nil
}
