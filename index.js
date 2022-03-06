import { helloWorld } from "./hello-world";
import confetti from 'canvas-confetti';

helloWorld();
confetti.create(document.getElementById('canvas'), {
    resize: true,
    useWorker: true,
})({particleCount: 200, spread: 200});