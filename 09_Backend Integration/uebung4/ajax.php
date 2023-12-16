<?php

$attraktionen = [ "FreiburgerMuenster", "KunsthausZuerich", "SchlossRapperswil" ];

$attraktionen_infos = [
	"FreiburgerMuenster" => [
				"text" => "Jeden Besucher Freiburgs zieht es sofort zum Münster, sobald er 
							über den Dächern der 
							Altstadt die durchbrochene Pyramide des schlanken Turms erblickt",
				"bild" => "img/freiburg.jpg"
	],
							
	"KunsthausZuerich" => [
				"text" => "Stetig wechselnde Ausstellungen mit hochqualitativen Meisterwerken 
	                       aus aller Welt. 
	                       Jedes Jahr mit vielen Grossereignissen wie die aufregende und 
						   kontroverse Cindy Sherman-Ausstellung",
				// DONE: Array um Bild ergänzen
				"bild" => "img/zuerich.jpg"
	],
	
	"SchlossRapperswil" => [
				"text" =>   "Es ist ein besonderer Ort, an dem man die hektische Welt 
							ausserhalb der dicken Schlossmauern schnell vergisst. Konzerte 
							geniessen, frischer Kaffeeduft, ...",
				"bild" => "img/rapperswil.jpg"
	]
 
	];

	function getAttractionList() {
		global $attraktionen;
		
		echo json_encode($attraktionen);		
	}

	function getAttractionInfo() {
		global $attraktionen;
		global $attraktionen_infos;

		if (isset($_GET['attraktion'])) {
			$attraktion = $_GET['attraktion'];
			
			if (isset($attraktionen_infos[$attraktion])) {
				echo json_encode($attraktionen_infos[$attraktion]);					
			} else {
				echo "Fehler: Attraktion '" . $attraktion . "' nicht bekannt";
			}

		} else {
			echo "Fehler: Aktion 'info' benötigt Parameter 'attraktion'";
		}
	}
	
	if (isset($_GET['action'])) {
		$action = $_GET['action'];

		if ($action == "list") {
			getAttractionList();
		} else if ($action == "info") {			
			getAttractionInfo();
		} else {
			echo "Fehler: unbekannte Aktion: '" . "'";
		}
	} else {
		echo "Fehler: Parameter 'action' nicht gesetzt";
	}
?>