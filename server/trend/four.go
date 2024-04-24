package trend

import "pseudo-store/db"

type TrendFour struct {
	Year            string
	Month           string
	AverageLifetime float64
}

func GetTrendFour(municipality string, gender string, lowDate string, highDate string, lowAge int, highAge int) ([]TrendFour, error) {
	var results []TrendFour

	err := db.Oracle.Raw(`
		WITH MonthlyMemberLifetime AS (
			SELECT
				m.ID AS customer_id,
				m.First_Name || ' ' || m.Last_Name AS member_name,
				m.Gender AS gender,
				COUNT(DISTINCT o.ID) AS total_orders,
				MIN(o.created_at) AS first_order_date,
				MAX(o.created_at) AS latest_order_date,
				EXTRACT(DAY FROM (MAX(o.created_at) - MIN(o.created_at))) AS member_lifetime_days,
				EXTRACT(YEAR FROM o.created_at) AS order_year,
				EXTRACT(MONTH FROM o.created_at) AS order_month
			FROM
				Members m
			JOIN
				Orders o ON m.ID = o.Member_ID
			WHERE
				o.created_at BETWEEN TO_DATE(?, 'YYYY-MM') AND TO_DATE(?, 'YYYY-MM')
				AND TRUNC(MONTHS_BETWEEN(SYSDATE, m.Birthdate) / 12) BETWEEN ? AND ?
				AND m.Gender = ?
				AND m.Municipality = ?
			GROUP BY
				m.ID, m.First_Name, m.Last_Name, m.Gender, EXTRACT(YEAR FROM o.created_at), EXTRACT(MONTH FROM o.created_at)
		)
		SELECT
			order_year AS year,
			TO_CHAR(TO_DATE(order_month, 'MM'), 'Month') AS month,
			AVG(member_lifetime_days) AS average_lifetime
		FROM
			MonthlyMemberLifetime
		GROUP BY
			gender, order_year, order_month
		ORDER BY
			gender, order_year, order_month
	`, lowDate, highDate, lowAge, highAge, gender, municipality).Scan(&results).Error

	if err != nil {
		return nil, err
	}

	return results, nil
}
