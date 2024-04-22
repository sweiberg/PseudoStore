package currency

import "fmt"

type USD uint64

// Convert a 64 bit float value to a USD value
func FloatToUSD(value float64) USD {
	return USD((value * 100) + 0.5)
}

// Convert a USD value to a 64 bit float value
func (value USD) Float64() float64 {
	return float64(value) / 100
}

// Convert a USD value to a formatted string value
func (value USD) String() string {
	return fmt.Sprintf("$%.2f", value.Float64())
}

// Multiply a USD value by a 64 bit float value
func (USDValue USD) Multiply(floatValue float64) USD {
	return USD((float64(USDValue) * floatValue) + 0.5)
}

// Divide a USD value by a 64 bit float value
func (USDValue USD) Divide(floatValue float64) USD {
	return USD((float64(USDValue) / floatValue) + 0.5)
}
