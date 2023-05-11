using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class AreaDetector : MonoBehaviour
{   
    public Text floorIndicator; 
    public Text areaIndicator; 
    public Image elevatorOptionsBG;
    public Text elevatorOptionsHeader;
    public Text elevatorOptions;
    public Image guideBG;
    public Text guideHeader;
    public Text guideOptions;

    public GameObject player;

    public Collider floor1;
    public Collider floor2;
    public Collider elevators1;
    public Collider elevators2;

    public Collider rangeOfGuide;

    // public Collider coffeeShop; // rm 131
    // public Collider entrance;
    // public Collider rm134;
    // public Collider pastaShop; // rm 135
    // public Collider rm136C;
    // public Collider corridor;
    // public Collider rm117A;

    // Dictionary<Collider, String> areas = new Dictionary<Collider, String> {
    //     {floor1, "Floor 1"},
    //     {floor2, "Floor 2"},
    //     // {elevators1, "Elevators area"},
    //     // {elevators2, "Elevators area"},
    //     {coffeeShop, "Coffee Shop (rm 131)"},
    //     {entrance, "Entrance doors"},
    //     {rm134, "rm 134"},
    //     {pastaShop, "Pasta Shop (rm 135)"},
    //     {rm136C, "rm 136C"},
    //     {rm102Z, "rm 102Z"},
    //     {rm117A, "rm 117A"}
    // };
    
    Collider inArea;

    void Start() {
        deactivateElevators();
        deactivateGuide();
    }

    void OnTriggerEnter(Collider other)
    {

        if (other == elevators1) {  
            inArea = elevators1;
            activateElevators(1);
        } else if (other == elevators2) {
            inArea = elevators2;
            activateElevators(2);

        } else if (other == floor1) {
            Debug.Log("Player entered floor1 area");
            floorIndicator.text = "Current floor: Floor 1";
        } else if (other == floor2) {
            Debug.Log("Player entered floor2 area");
            floorIndicator.text = "Current floor: Floor 2";

        } else if (other == rangeOfGuide) {
            inArea = rangeOfGuide;
            activateGuide();

        } else {
            Debug.Log("Player entered " + other.name + " area");
            inArea = other;
            areaIndicator.text = "Current area: " + other.name;
        }
        

    }


    void Update()
    {

            // checking to see if the player is still in the area specified by the collider
            if ( inArea != null && !player.GetComponent<Collider>().bounds.Intersects(inArea.GetComponent<Collider>().bounds)) {
                Debug.Log("Player left area");
                inArea = null;
            }

            if ( inArea != elevators1 && inArea != elevators2) {
                deactivateElevators();
            }

            if ( inArea != rangeOfGuide) {
                deactivateGuide();
            }

            if (inArea == elevators2 && Input.GetKey(KeyCode.Alpha1)) {
                transform.position = new Vector3(transform.position.x, -3.5f, transform.position.z);
                activateElevators(2);
            }

            if (inArea == elevators1 && Input.GetKey(KeyCode.Alpha2)) {
                transform.position = new Vector3(transform.position.x, 2.8f, transform.position.z);
                activateElevators(1);
            }

            // if (inArea == rangeOfGuide && Input.GetKey(KeyCode.Alpha2)) {
            //     transform.position = new Vector3(transform.position.x, 2.8f, transform.position.z);
            //     activateElevators(1);
            // }
    }

   private void activateGuide()
    {
        guideBG.enabled = true;
        guideHeader.enabled = true;
        guideOptions.enabled = true;
    }


    private void deactivateGuide()
    {
        guideBG.enabled = false;
        guideHeader.enabled = false;
        guideOptions.enabled = false;
    }

    private void activateElevators(int floor) {
        areaIndicator.text = "Current area: Elevators";

        if (floor == 1) {
            inArea = elevators1;
        } else if (floor == 2) {
            inArea = elevators2;
        }
        
        elevatorOptionsBG.enabled = true;
        elevatorOptionsHeader.enabled = true;
        elevatorOptions.enabled = true;
    }

    private void deactivateElevators() {
        // areaIndicator.text = "Current area: -";

        elevatorOptionsBG.enabled = false;
        elevatorOptionsHeader.enabled = false;
        elevatorOptions.enabled = false;
    }
}
