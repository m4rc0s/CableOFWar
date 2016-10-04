#pragma strict

function ChangeSceneTo( scene : String ) {
	Application.LoadLevel(scene);
}


function Update(){
	
	if ( Input.GetKeyDown ( KeyCode.Return ) ) {
		ChangeSceneTo('Level_1');
	}

}