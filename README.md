Western notes double in frequency every octave, but why not triple?

Use src\Constants to change the exponent base, number of notes, and the constant frequency used to calculate other note values. Please ignore the three inputs in the app that look like they might do something to set these. As a surprise twist, they do not do anything to set those values.
The constants are initially set to base 3, the usual 12 notes, and a constant frequency of 729 for a nice shiny power of 3 to go with the base.

Please use a qwerty keyboard layout and don't hit capslock (I should probably just use toLowercase()).

`npm start` to run.

In theory, there is a lovely oscillator hanging out (which doesn't do anything unless the `running` const in the Waveform component is set to true), but you probably won't have a hot time if you're hot-reloading. Might have something to do with the recursions I assume are just floating around after every render, loosed unto the world, but it's all a mystery to me at the mo'.

## To-dos
- [ ] force characters to lowercase
- [ ] get those fields that should do things doing things
- [ ] fix the oscillator canvas bonanza
- [ ] clickable keys

## Might-dos?
### Really they're all might dos at this point, huh.
- [ ] make it look nice