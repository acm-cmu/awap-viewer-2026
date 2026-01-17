import { ViewerActionContext } from "../Pages/Viewer";
import { useContext } from "react";

const CreditScreen = () => {
    const actionContext = useContext(ViewerActionContext);

    if (!actionContext) {
      throw new Error('useViewer must be used within a ViewerProvider');
  }

    return (
        <div className="credit-screen">
            <div className="credit-screen-inner">
                <h1>The following Models were used in creation of this viewer:</h1>
                <ul>
                    <li>"Small Shop" (https://skfb.ly/oYZYO) by Kacang Garing is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).</li>
                    <li>"Basic Sink" (https://skfb.ly/XNDo) by rustbucket is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).</li>
                    <li>"Low-Poly 3D Small Flag" (https://skfb.ly/prS7t) by Produk Cerdas is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).</li>               
                    <li>"trash_garbage Poubelle" (https://skfb.ly/oBTGD) by taute is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).</li>
                    <li>"Kitchen table" (https://skfb.ly/oPLOM) by FrezzY is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).</li>
                    <li>"Stylized Wooden Crate" (https://sketchfab.com/3d-models/stylized-wooden-crate-93c22095611d41819618f0a940299f5c)</li>
                </ul>
            </div>
            <button className="toggle-credit-screen" 
                    onClick={() => {actionContext.setShowCreditScreen(false)}}>X</button>
        </div>
    )
}

export default CreditScreen