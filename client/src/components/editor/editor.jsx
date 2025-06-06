import "./editor.css";
import Layers from "./Layers";
import Options from "./Options";
import Workspace from "./Workspace";

const Editor = () => {
	return (
		<div className="editor">
			<Layers />
			<Workspace />
			<Options />
		</div>
	);
};

export default Editor;
