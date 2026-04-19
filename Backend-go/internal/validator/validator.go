package validator

import (
	"errors"
	"multi-step-form-main/internal/models"
)

func ValidateInputData(user *models.InputData) error {
	if user == nil {
		return errors.New("User Cannot be nil")
	}

	if user.Name == " " {
		return errors.New("Names cannot be empty")
	}

	if user.Email == " " {
		return errors.New("Email cannot be empty")
	}

	if user.Phone == " " {
		return errors.New("Phone is required")
	}

	if user.Plan == " " {
		return errors.New("Plan is required")
	}

	if user.Billing == " " {
		return errors.New("Billing is required")
	}

	return nil
}