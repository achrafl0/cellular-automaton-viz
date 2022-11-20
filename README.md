# Cellular Automaton Visualisation

## About

This project is made in React to have fun around 2D cellular automaton and explore the [Norman H. Packard and Stephen Wolfram paper](http://brainmaps.org/pdf/ca3.pdf).

## Roadmap

- [x] Setup the project
- [x] Setup the display of a grid
- [x] Apply the rules on the press of a button
- [x] Apply the rules automatically each X ms
- [x] Have user input for the rule
- [x] Have user input for which neighbors to chose 
- [x] Add the possibility for the user to input initial state
- [ ] Refactor the code to be easier to handle ( to explore [Cellular Automata Algorithms](https://www.hermetic-systems.com/compsci/cellular_automata_algorithms.htm) )
- [ ] Seperate Birth/Survival rules ( now we are considering them as the same rule, making it impossible to simulate Conway's Game of life for instance ) for now we represent the rule as a 10bit number, we'll make the switch to a 20bit number after )  
- [ ] Better display of the rule for explaining the behaviors 
- [ ] Add small database of interesting rules

<img width="1509" alt="Capture d’écran 2022-11-20 à 00 56 58" src="https://user-images.githubusercontent.com/63306573/202876204-e1c07785-cb72-4ec3-8901-05a4af097adf.png">
