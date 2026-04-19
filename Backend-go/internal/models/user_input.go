package models

type Addons struct {
	Online  bool `json:"online"`
	Storage bool `json:"storage"`
	Profile bool `json:"profile"`
}

type InputData struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Phone   string `json:"phone"`
	Plan    string `json:"plan"`
	Addons  Addons `json:"addons"`
	Billing string `json:"billing"`
}
