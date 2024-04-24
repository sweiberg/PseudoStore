package trend

import "pseudo-store/db"

type TrendThree struct {
	PaymentMonth    string
	PromotionStatus string
	TotalPayments   int
}

func GetTrendThree(lowDate string, highDate string, lowAge int, highAge int) ([]TrendThree, error) {
	var results []TrendThree

	err := db.Oracle.Raw(`
		WITH PaymentPromotion AS (
			SELECT
				TO_CHAR(p.created_at, 'YYYY-MM') AS payment_month,
				CASE
					WHEN p.promotion_value > 0 THEN 'With Promotion'
					ELSE 'Without Promotion'
				END AS promotion_status,
				COUNT(*) AS payment_count
			FROM
				Payments p
				INNER JOIN Members m ON p.member_id = m.id
			WHERE
				p.created_at BETWEEN TO_DATE(?, 'YYYY-MM') AND TO_DATE(?, 'YYYY-MM')
				AND EXTRACT(YEAR FROM SYSDATE) - EXTRACT(YEAR FROM m.birthdate) BETWEEN ? AND ?
			GROUP BY
				TO_CHAR(p.created_at, 'YYYY-MM'),
				CASE
					WHEN p.promotion_value > 0 THEN 'With Promotion'
					ELSE 'Without Promotion'
				END
		)
		SELECT
			payment_month,
			promotion_status,
			SUM(payment_count) AS total_payments
		FROM
			PaymentPromotion
		GROUP BY
			payment_month, promotion_status
		ORDER BY
			payment_month, promotion_status
	`, lowDate, highDate, lowAge, highAge).Scan(&results).Error

	if err != nil {
		return nil, err
	}

	return results, nil
}
