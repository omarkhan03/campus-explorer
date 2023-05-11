using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.AI;

public class Pathfinding : MonoBehaviour
{
    public NavMeshAgent agent;
    public Transform office;
    public Transform elevators1;
    public Transform elevators2;

    void Start() {
        
    }

    // Update is called once per frame
    void Update()
    {
        // if (Vector3.Distance(transform.position, agent.destination) < 1f) {
        //     Debug.Log("Close to agent");
        // }

        if (Input.GetKey(KeyCode.P)) {
            agent.SetDestination(elevators1.position);
        }
        if (Input.GetKey(KeyCode.O)) {
            agent.SetDestination(elevators2.position);
        }
        if (Input.GetKey(KeyCode.K)) {
            agent.SetDestination(office.position);
        }

        //if the distance between the player and the agent is less than 1 meter

    }
}
