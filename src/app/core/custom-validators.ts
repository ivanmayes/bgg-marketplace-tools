import { Validators } from '@angular/forms';

export const zipValidator = Validators.pattern(/(^\d{5}$)|(^\d{5}-\d{4}$)/);
export const usPhoneValidator = Validators.pattern(
	/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/
);
export const ohioValidator = Validators.pattern(/OH/);
