import { Subject } from 'rxjs';

export class UIService {

    // service to trigger spinners and hints

    spinnerState = new Subject<boolean>();
    hintState = new Subject<boolean>();

}
