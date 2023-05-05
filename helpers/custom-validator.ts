import { FormControl, ValidationErrors } from "@angular/forms";

export class CustomValidators{
    public static passwordValidator(password: FormControl): ValidationErrors | null{
        let errors:any = {};
        if(password.value.length<8)
        {
            errors.minLength=true;
        }
        if(password?.value?.match(/\d/)){
            errors.containsDigit=true;
        }
        return errors;
    }
}