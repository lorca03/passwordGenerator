import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiWordsService } from './api-words.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, HttpClientModule],
  providers: [HttpClient, ApiWordsService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private randomWordService: ApiWordsService) { }
  title = 'passwordGenerator';

  password: string = '';
  numPalabras: number = 5;

  shiftedKeys: string[] = ["=", "!", '"', "·", "$", "%", "&", "/", "(", ")"];

  async generatePassword(): Promise<void> {
    try {
      let randomWord = await this.randomWordService.getRandomWord(this.numPalabras).toPromise();
      randomWord = randomWord[0];
      randomWord = randomWord.replace(/[áéíóú]/gi, function (match: string) {
        return 'aeiou'.charAt('áéíóú'.indexOf(match));
      });
      randomWord = randomWord.replace(/^./, randomWord.charAt(0).toUpperCase());

      const randomNumber = Math.floor(Math.random() * 10);
      randomWord += randomNumber.toString();
      randomWord += this.shiftedKeys[randomNumber];

      for (let i = 0; i < 4; i++) {
        const randomDigit = Math.floor(Math.random() * 10);
        randomWord += randomDigit.toString();
      }

      this.password = randomWord;
    } catch (error) {
      console.error("Error al obtener la palabra aleatoria:", error);
      this.password = "Error al obtener la palabra aleatoria";
    }
  }

  changeSlider(event: string) {
    if (event == "+" && this.numPalabras + 1 <= 10) {
      this.numPalabras++;
    } else if (event == "-" && this.numPalabras - 1 >= 5) {
      this.numPalabras--;
    }
  }

  copyToClipboard() {
    if (this.password) {
      navigator.clipboard.writeText(this.password);
    }
  }

}
