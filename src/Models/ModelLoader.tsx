import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import SliceFish from "../assets/models/anchovies_Slice_Fish_0.glb";

const Model = () => {
    const gltf = useLoader(GLTFLoader, SliceFish)
    return <primitive object={gltf.scene}></primitive>
}

export default Model