import { ViewerActionContext } from "./Viewer";
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
                    <li>"Vegetable Market" (https://skfb.ly/oPHyE) by anastasiaremezova is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).</li>
                    <li>"Basic Sink" (https://skfb.ly/XNDo) by rustbucket is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).</li>
                    <li>"Low-Poly 3D Small Flag" (https://skfb.ly/prS7t) by Produk Cerdas is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).</li>               
                    <li>"trash_garbage Poubelle" (https://skfb.ly/oBTGD) by taute is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).</li>
                    <li>"Kitchen table" (https://skfb.ly/oPLOM) by FrezzY is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).</li>
                    <li>"Stylized Wooden Crate" (https://sketchfab.com/3d-models/stylized-wooden-crate-93c22095611d41819618f0a940299f5c)</li>
                    <li>"Stove" (https://free3d.com/3d-model/range-cooker-58706.html)</li>
                    <li>"Cat Pan" (https://skfb.ly/ou9B9) by mdiaz16 is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).</li>
                    <li>"Chef Hat (Toon)" (https://skfb.ly/o6PCV) by shimtimultimedia is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).</li>
                    <li>"Ramen" (https://skfb.ly/pEzUX) by IssBlack is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).</li>
                </ul>
            </div>
            <button className="toggle-credit-screen" 
                    onClick={() => {actionContext.setShowCreditScreen(false)}}>X</button>
        </div>
    )
}

export default CreditScreen