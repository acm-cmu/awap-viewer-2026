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
                </ul>
            </div>
            <button className="toggle-credit-screen" 
                    onClick={() => {actionContext.setShowCreditScreen(false)}}>X</button>
        </div>
    )
}

export default CreditScreen