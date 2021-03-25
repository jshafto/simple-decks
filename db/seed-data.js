const deck1 = {
  name: "German Noun Practice",
  category: "Foreign Languages",
  username: "Demo",
};

const deck2 = {
  name: "Trigonometry",
  category: "Mathematics",
  username: "Demo",
};

const deck3 = {
  name: "Javascript Trivia",
  category: "Programming Languages",
  username: "Demo",
};

const deck4 = {
  name: "Neurotransmitters",
  category: "Neuroscience",
  username: "Demo",
};

const deck5 = {
  name: "Existentialist Novels",
  category: "Literature",
  username: "Demo"
}

const deck6 = {
  name: "Noble Gases",
  category: "Science",
  username: "Demo"
}
const deck7 = {
  name: "Chonks",
  category: "Cats",
  username: "Demo"
}

const deck8 = {
  name: "Spanish Preterite Tense",
  category: "Foreign Languages",
  username: "pastaman",
};

const deck9 = {
  name: "Know your primes",
  category: "Mathematics",
  username: "koroksheep",
};

const deck10 = {
  name: "Sorting Algorithms",
  category: "Computer Science",
  username: "Julie",
};

const deck11 = {
  name: "Organelles",
  category: "Science",
  username: "raggedcringle",
};

const deck12 = {
  name: "Human Neuroanatomical Structures",
  category: "Neuroscience",
  username: "brisktangible",
};

const deck13 = {
  name: "Know Your Floofs",
  category: "Cats",
  username: "bellgromit",
};

const deckNames = [deck1.name, deck2.name, deck3.name, deck4.name, deck5.name, deck6.name, deck7.name, deck8.name, deck9.name, deck10.name, deck11.name, deck12.name, deck13.name]

const falsyValuesMarkdown = `
| Value             | Description                           |
|-------            |------------------                     |
| \`false\`         | The keyword false.                    |
| \`0\`, \`-0\`     | The Number zero and negative zero.    |
| \`0n\`, \`-0n\`   | The BigInt zero and negative zero.    |
| \`""\`, \`''\`    | Empty string value.                   |
| \`null\`          | \`null\` — the absence of any value.  |
| \`undefined\`     | \`undefined\` — the primitive value.  |
| \`NaN\`           | \`NaN\` — not a number.               |
`

const arrayUnshiftBack = `
- takes a single argument and adds the argument to the beginning of the array
- mutates the array it is called on
- returns the length of the mutated array
`
const hoistingFront = `
## Which of these two code blocks would throw an error?
\`\`\`
// A
console.log(funcA());
function foo () {
    return "print me";
};
// B
console.log(funcB());
var bad = function () {
    return "print me";
}
\`\`\`
`
const varDeckBack = `
- \`const\`: cannot reassign variable, scoped to block
- \`let\`: can reassign variable, scoped to block
- \`var\`: outdated, may or may not be reassigned, scoped to function. can be not just reassigned, but also redeclared
`
const realCards = [
  { front: "Piano", back: "Klavier", deckName: deck1.name },
  { front: "Dog", back: "Hund", deckName: deck1.name },
  { front: "Cheese", back: "Käse", deckName: deck1.name },
  { front: "House", back: "Haus", deckName: deck1.name },
  { front: "City", back: "Stadt", deckName: deck1.name },
  { front: "Supermarket", back: "Supermarkt", deckName: deck1.name },
  { front: "Mirror", back: "Spiegel", deckName: deck1.name },
  { front: "Right triangle", back: "A triangle that has a 90 degree angle.", deckName: deck2.name },
  { front: "Sine", back: "Opposite over hypotenuse", deckName: deck2.name },
  { front: "Cosine", back: "Adjacent over hypotenuse", deckName: deck2.name },
  { front: "Tangent", back: "Opposite over adjacent", deckName: deck2.name },
  { front: "Unit Circle", back: "A special circle with a radius of one", deckName: deck2.name },
  { front: "Falsy Values in Javascript", back: falsyValuesMarkdown, deckName: deck3.name },
  { front: "`Array#unshift`", back: arrayUnshiftBack, deckName: deck3.name },
  { front: hoistingFront, back: "Code block B throws a TypeError", deckName: deck3.name },
  { front: "Identify the difference between `const`, `let`, and `var` declarations", back: varDeckBack, deckName: deck3.name },
  { front: "Glutamate", back: "The most abundant excitatory neurotransmitter in the vertebrate nervous system—involved in cognitive functions such as learning and memory.", deckName: deck4.name },
  { front: "Acetylcholine", back: "The chemical that motor neurons of the nervous system release in order to activate muscles.", deckName: deck4.name },
  { front: "Dopamine", back: "Signals the perceived motivational prominence (i.e., the desirability or aversiveness) of an outcome.", deckName: deck4.name },
  { front: "Serotonin", back: "Serotonergic neurons of the CNS regulate mood, appetite, and sleep. Also involved in cognitive functions like memory and learning.", deckName: deck4.name },
  { front: "L'âge de raison (The Age of Reason)", back: "Jean-Paul Sartre (1945)", deckName: deck5.name },
  { front: "As I Lay Dying", back: "William Faulkner (1930)", deckName: deck5.name },
  { front: "Die Verwandlung (The Metamorphosis)", back: "Franz Kafka (1916)", deckName: deck5.name },
  { front: "He", back: "Helium (2)", deckName: deck6.name },
  { front: "Ne", back: "Neon (10)", deckName: deck6.name },
  { front: "Ar", back: "Argon (18)", deckName: deck6.name },
  { front: "Kr", back: "Krypton (36)", deckName: deck6.name },
  { front: "Xe", back: "Xenon (54)", deckName: deck6.name },
  { front: "Rn", back: "Radon (86)", deckName: deck6.name },
  { front: "Og", back: "Oganesson (118)", deckName: deck6.name },
  { front: "![cat](https://d2ph5fj80uercy.cloudfront.net/05/cat174.jpg)", back: "Potato", deckName: deck7.name },
  { front: "![cat](https://d2ph5fj80uercy.cloudfront.net/04/cat1957.jpg)", back: "Blanket", deckName: deck7.name },
  { front: "![cat](https://d2ph5fj80uercy.cloudfront.net/06/cat926.jpg)", back: "Pumpkin", deckName: deck7.name },
  { front: "tomar", back: "yo tomé, tu tomaste, el/ella tomó", deckName: deck8.name },
  { front: "sacar", back: "yo saqué, tu sacaste, el/ella sacó", deckName: deck8.name },
  { front: "ir", back: "yo fui, tu fuiste, el/ella fue", deckName: deck8.name },
  { front: "2", back: "prime", deckName: deck9.name },
  { front: "11", back: "prime", deckName: deck9.name },
  { front: "27", back: "not prime", deckName: deck9.name },
  { front: "49", back: "not prime", deckName: deck9.name },
  { front: "97", back: "prime", deckName: deck9.name },
  { front: "161", back: "not prime", deckName: deck9.name },
  { front: "223", back: "prime", deckName: deck9.name },
  { front: "257", back: "prime", deckName: deck9.name },
  { front: "267", back: "not prime", deckName: deck9.name },
  { front: "401", back: "prime", deckName: deck9.name },
  { front: "831", back: "not prime", deckName: deck9.name },
  { front: "Bubble sort", back: "`O(n^2)` time complexity, `O(1)` space complexity", deckName: deck10.name },
  { front: "Selection sort", back: "`O(n^2)` time complexity,, `O(1)` space complexity", deckName: deck10.name },
  { front: "Insertion sort", back: "`O(n^2)` time complexity,, `O(1)` space complexity", deckName: deck10.name },
  { front: "Merge sort", back: "`O(n*log(n))` time complexity, `O(n)` space complexity (or `O(n*log(n))` if we do it by keeping track of indices rather than allocating a new array each time)", deckName: deck10.name },
  { front: "Quick sort", back: "`O(n*log(n))` time complexity on average, `O(n`<sup>`2`</sup>`)` worst case. however, worst case is rare. space complexity `O(n)` naively, but can be tweaked to be `O(log(n))`", deckName: deck10.name },
  { front: "Binary search", back: "`O(n*log(n))` (requires a sorted list)", deckName: deck10.name },
  { front: "Mitochondria", back: "Powerhouse of the cell", deckName: deck11.name },
  { front: "Golgi apparatus", back: "a complex of vesicles and folded membranes within the cytoplasm of most eukaryotic cells, involved in secretion and intracellular transport", deckName: deck11.name },
  { front: "Endoplasmic reticulum", back: "a network of membranous tubules within the cytoplasm of a eukaryotic cell, continuous with the nuclear membrane. It usually has ribosomes attached and is involved in protein and lipid synthesis", deckName: deck11.name },
  { front: "parietal lobe", back: "integrates sensory information, including touch, temperature, pressure and pain", deckName: deck12.name },
  { front: "temporal lobe", back: "processes auditory information and encodes memory.", deckName: deck12.name },
  { front: "occipital lobe", back: "visual perception, including colour, form and motion", deckName: deck12.name },
  { front: "frontal lobe", back: "higher order, executive function including planning, organizing, and controlling actions", deckName: deck12.name },
  { front: "![cat](https://d2ph5fj80uercy.cloudfront.net/06/cat3610.jpg)", back: "Beans", deckName: deck13.name },
  { front: "![cat](https://d2ph5fj80uercy.cloudfront.net/05/cat4497.jpg)", back: "Porkchop", deckName: deck13.name },
  { front: "![cat](https://d2ph5fj80uercy.cloudfront.net/06/cat53.jpg)", back: "Sneezle", deckName: deck13.name },
];
module.exports = {
  deck1,
  deck2,
  deck3,
  deck4,
  deck5,
  deck6,
  deck7,
  deck8,
  deck9,
  deck10,
  deck11,
  deck12,
  deck13,
  deckNames,
  realCards,
};
