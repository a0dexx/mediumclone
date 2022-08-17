import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.scss'],
})
export class WordsComponent implements OnInit {
  constructor() {}

  myArr = [
    'hilarious',
    'turkey',
    'first',
    'wing',
    'scatter',
    'full',
    'frightening',
    'children',
    'drop',
    'auspicious',
    'teeny-tiny',
    'visitor',
    'adapt',
    'rabbit',
    'calm',
    'self',
    'loud',
    'funny',
    'underwear',
    'market',
    'animal',
    'devilish',
    'idiotic',
    'attack',
    'cloistered',
    'hands',
    'wide',
    'front',
    'doubtful',
    'great',
    'cent',
    'screen',
    'basketball',
    'bashful',
    'follow',
    'brawny',
    'zippy',
    'fire',
    'hysterical',
    'tacky',
    'album',
    'tacit',
    'minister',
    'uninterested',
    'crooked',
    'anger',
    'shirt',
    'march',
    'bed',
    'list',
    'fog',
    'hurried',
    'pot',
    'shivering',
    'jumbled',
    'care',
    'territory',
    'scary',
    'painstaking',
    'chance',
    'quilt',
    'teeny',
    'scattered',
    'lace',
    'airport',
    'ghost',
    'shrug',
    'groan',
    'fanatical',
    'pigs',
    'hook',
    'cave',
    'panoramic',
    'trees',
    'trash',
    'interesting',
    'religion',
    'flagrant',
    'bottle',
    'crook',
    'valve',
    'unsightly',
    'sticky',
    'phobic',
    'trousers',
    'eye',
    'receive',
    'swanky',
    'laugh',
    'big',
    'earn',
    'general',
    'dragon',
    'adventurous',
    'tramp',
    'laborer',
    'pinch',
    'statuesque',
    'rich',
    'staking',
  ];

  ngOnInit(): void {
   // this.displayAllWords();
    this.getWords();
  }


  displayAllWords(){
    this.myArr.forEach((word, index )=> {
      console.log(index,word)
    })
  }


  getWords() {

    const array1 = [1,2,3,4];


    // const found = this.myArr.filter(element.index => 7);
    const found = this.myArr[3];

    array1.forEach((word,index) =>{
      console.log(index+1, word, this.myArr[word]);
    })

    console.log('found',found);
  }

}
