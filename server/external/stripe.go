package external

import (
	"github.com/stripe/stripe-go"
	"os"
	"pseudo-store/currency"

	"github.com/stripe/stripe-go/charge"
)

func StripeProcessCharge(price currency.USD, email string) (*stripe.Charge, error) {
	stripeAPIKey := os.Getenv("STRIPE_API_KEY")
	stripe.Key = stripeAPIKey

	charge, err := charge.New(&stripe.ChargeParams{
		Amount:       stripe.Int64(int64(price)),
		Currency:     stripe.String(string(stripe.CurrencyUSD)),
		Source:       &stripe.SourceParams{Token: stripe.String("tok_visa")},
		ReceiptEmail: stripe.String(email)})

	if err != nil {
		return &stripe.Charge{}, err
	}

	return charge, nil
}
