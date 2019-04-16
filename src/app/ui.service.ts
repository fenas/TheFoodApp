import { Subject } from 'rxjs';



export class UIService {

    spinnerState = new Subject<boolean>();
    hintState = new Subject<boolean>();

}
