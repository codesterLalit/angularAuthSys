import { Injectable } from "@angular/core";

@Injectable()
export class JwtHandlerService {
  getToken(): String {
    if (localStorage.getItem("jwtToken")) {
      let data = JSON.parse(localStorage.getItem("jwtToken"));
      return data;

    } else {
      console.log("else");
      return null;
    }
  }

  saveToken(token: String) {
    window.localStorage.setItem("jwtToken", JSON.stringify(token));
  }

  destroyToken() {
    window.localStorage.removeItem("jwtToken");
  }

  checkToken(){
    if (localStorage.getItem("jwtToken")) {
      return true
    }
    else{
      return false;
    }
  }

  GetPayload() {
    const token = this.getToken();
    let payload;
    if (token) {
      try {
        payload = token.split(".")[1];
        payload = JSON.parse(window.atob(payload));
      } catch {
        this.destroyToken();
        location.reload(true);
      }
    }
    console.log(payload);
    return payload;
  }
}
