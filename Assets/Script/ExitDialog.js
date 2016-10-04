#pragma strict

var GuiOn = false;

function OnGUI () {            
	if(GuiOn){
	
		GUI.Box (Rect (10,10,100,90), "You sure?");
    
    	if (GUI.Button (Rect (20,40,80,20), "Yes")) {
    		Application.Quit();
		}
		
		if (GUI.Button (Rect (20,70,80,20), "No")) {
           	GuiOn=false;
        }
  	}
}

function OnMouseDown(){
	GuiOn = true;
}
