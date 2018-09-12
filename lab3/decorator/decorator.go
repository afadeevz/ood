package decorator

import (
	"bytes"

	"ood/lab3/beverage"
	"ood/lab3/condiment"
)

type condimentDecorator struct {
	beverage  beverage.Beverage
	condiment condiment.Condiment
}

func Decorate(beverage beverage.Beverage, condiment condiment.Condiment) beverage.Beverage {
	return &condimentDecorator{
		beverage:  beverage,
		condiment: condiment,
	}
}

func (cd *condimentDecorator) GetCost() float64 {
	return cd.beverage.GetCost() + cd.condiment.GetCondimentCost()
}

func (cd *condimentDecorator) String() string {
	var buf bytes.Buffer
	buf.WriteString(cd.beverage.String())
	buf.WriteString(", ")
	buf.WriteString(cd.condiment.String())
	return buf.String()
}
