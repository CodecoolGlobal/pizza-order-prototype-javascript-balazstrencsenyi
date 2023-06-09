import { createAdminForm } from "./createAdminForm.js";
import { adminLoginHandler } from "./adminLoginHandler.js";

function main(){
    const root = document.getElementById("root")
    
    root.append(createAdminForm())
    adminLoginHandler()
    
}
main()