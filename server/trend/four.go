package trend

import "pseudo-store/db"

type TrendFour struct {
	OrderMonth      string
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
				TO_CHAR(o.created_at, 'YYYY-MM') AS order_year_month
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
				m.ID, m.First_Name, m.Last_Name, m.Gender, TO_CHAR(o.created_at, 'YYYY-MM')
		)
		SELECT
			order_year_month AS order_month,
			AVG(member_lifetime_days) AS average_lifetime
		FROM
			MonthlyMemberLifetime
		GROUP BY
			gender, order_year_month
		ORDER BY
			gender, order_year_month
	`, lowDate, highDate, lowAge, highAge, gender, municipality).Scan(&results).Error

	if err != nil {
		return nil, err
	}

	return results, nil
}
