using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class AreaDetector : MonoBehaviour
{   
    public Text floorIndicator; 
    public Text areaIndicator; 
    public Collider floor1;
    public Collider floor2;
    public Collider elevators1;
    public Collider elevators2;
    public Collider coffeeShop;
    public Collider entrance;

    public GameObject player;

    public Image elevatorOptionsBG;
    public Text elevatorOptionsHeader;
    public Text elevatorOptions;

    Collider inArea;

    void Start() {
        deactivateElevators();
    }

    void OnTriggerEnter(Collider other)
    {

        if (other == elevators1) {  
            activateElevators(1);
        } else if (other == elevators2) {
            activateElevators(2);
        }

        if (other == entrance) {
            Debug.Log("Player entered entrance area");
            inArea = entrance;
            areaIndicator.text = "Current area: Entrance doors";
        }

        if (other == coffeeShop) {
            Debug.Log("Player entered coffee area");
            inArea = coffeeShop;
            areaIndicator.text = "Current area: Coffee Shop";
        }

        if (other == floor1) {
            Debug.Log("Player entered floor1 area");
            floorIndicator.text = "Current floor: Floor 1";
        } else if (other == floor2) {
            Debug.Log("Player entered floor2 area");
            floorIndicator.text = "Current floor: Floor 2";
        } 
        

    }

    void Update()
    {

        if (inArea != null) {

            // checking if the player is still in an elevator area
            if (inArea == elevators1 || inArea == elevators2) {
                if (!player.GetComponent<Collider>().bounds.Intersects(elevators1.GetComponent<Collider>().bounds) &&
                !player.GetComponent<Collider>().bounds.Intersects(elevators2.GetComponent<Collider>().bounds)) {
                    deactivateElevators();
                }

                if (Input.GetKey(KeyCode.Alpha1)) {
                    Console.Write("Player pressed 1");
                    // set y coordinate of player to -3.5
                    transform.position = new Vector3(transform.position.x, -3.5f, transform.position.z);
                    activateElevators(1);
                }

                if (Input.GetKey(KeyCode.Alpha2)) {
                    Console.Write("Player pressed 2");
                    // set y coordinate of player to 2.8
                    transform.position = new Vector3(transform.position.x, 2.8f, transform.position.z);
                    activateElevators(2);
                }
            
            // checking to see if the player is still in the area specified by the collider
            } else {
                if (!player.GetComponent<Collider>().bounds.Intersects(inArea.GetComponent<Collider>().bounds)) {
                    Debug.Log("Player left area");
                    areaIndicator.text = "Current area: Main area";
                    inArea = null;
                }
            }

        }

    }

    private void activateElevators(int floor) {
        areaIndicator.text = "Current area: Elevators";

        if (floor == 1) {
            inArea = elevators1;
            Debug.Log("Player entered elevators 1!!!!!");
        } else if (floor == 2) {
            inArea = elevators2;
        }
        

        elevatorOptionsBG.enabled = true;
        elevatorOptionsHeader.enabled = true;
        elevatorOptions.enabled = true;
    }

    private void deactivateElevators() {
        inArea = null;
        areaIndicator.text = "Current area: Main area";

        elevatorOptionsBG.enabled = false;
        elevatorOptionsHeader.enabled = false;
        elevatorOptions.enabled = false;
    }
}
