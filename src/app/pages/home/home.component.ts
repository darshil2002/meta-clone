import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AuthenticatorComponent } from 'src/app/tools/authenticator/authenticator.component';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private loginSheet: MatBottomSheet , private toastr: ToastrService,  private router: Router, private activatedRoute: ActivatedRoute) {}

  openBottomSheet(): void {
    
    let loginSheetInstence= this.loginSheet.open(AuthenticatorComponent);

    loginSheetInstence.instance.closed.subscribe(() => {
      // this.openToaster('')
    });

    loginSheetInstence.instance.showToast.subscribe((res)=>{
      this.openToaster(res)
    })
    
  } 

  openToaster(text:string){
    console.log(`${text}`)
    this.toastr.success(`${text}`);
  }
  route(){
    this.router.navigate(['app-profile'],{relativeTo:this.activatedRoute});
  }
  // newRecipe(){
  //   this._route.navigate(['new'],{relativeTo:this._activatedRoute})
  // }
}
