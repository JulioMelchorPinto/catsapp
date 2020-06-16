import data from "../data";
import CatchTheCatGame from "../game";
import Cat from "../sprites/cat";
import Block from "../sprites/block";
import ResetButton from "../sprites/resetButton";
import StatusBar from "../sprites/statusBar";
import CreditText from "../sprites/creditText";
import _ from "../i18n";
import nearestSolver from "../solvers/nearestSolver";
import RawSVGFile from "../lib/RawSVGFile";

declare type NeighbourData = {
    i?: number,
    j?: number,
    x?: number,
    y?: number,
}

enum GameState {
    PLAYING = "playing",
    WIN = "win",
    LOSE = "lose",
}

export default class MainScene extends Phaser.Scene {
    public readonly w: number;
    public readonly h: number;
    public readonly r: number;
    public readonly dx: number;
    public readonly dy: number;
    public game: CatchTheCatGame;

    constructor(w: number, h: number, r: number) {
        super({
            key: "MainScene",
        });
        this.w = w;
        this.h = h;
        this.r = r;
        this.dx = this.r * 2;
        this.dy = this.r * Math.sqrt(3);
    }

    get blocks(): Block[][] {
        return this.data.get("blocks");
    }

    set blocks(value: Block[][]) {
        this.data.set("blocks", value);
    }

    get blocksData(): boolean[][] {
        let result: boolean[][] = [];
        this.blocks.forEach((column, i) => {
            result[i] = [];
            column.forEach((block, j) => {
                result[i][j] = block.isWall;
            });
        });
        return result;
    }

    get cat(): Cat {
        return this.data.get("cat");
    }

    set cat(value: Cat) {
        this.data.set("cat", value);
    }

    get statusBar(): Phaser.GameObjects.Text {
        return this.data.get("status_bar");
    }

    set statusBar(value: Phaser.GameObjects.Text) {
        this.data.set("status_bar", value);
    }

    get creditText(): CreditText {
        return this.data.get("credit_text");
    }

    set creditText(value: CreditText) {
        this.data.set("credit_text", value);
    }

    get state(): GameState {
        return this.data.get("state");
    }

    set state(value: GameState) {
        switch (value) {
            case GameState.PLAYING:
                break;
            case GameState.LOSE:
                this.setStatusText(_("El gato ha corrido hasta el borde del mapa, pierdes"));
                break;
            case GameState.WIN:
                this.setStatusText(_("El gato no tiene camino a seguir, tú ganas"));
                break;
            default:
                return;
        }
        this.data.set("state", value);
    }

    static getNeighbours(i: number, j: number): NeighbourData[] {
        let left = { i: i - 1, j: j };
        let right = { i: i + 1, j: j };
        let top_left;
        let top_right;
        let bottom_left;
        let bottom_right;
        if ((j & 1) === 0) {
            top_left = { i: i - 1, j: j - 1 };
            top_right = { i: i, j: j - 1 };
            bottom_left = { i: i - 1, j: j + 1 };
            bottom_right = { i: i, j: j + 1 };
        } else {
            top_left = { i: i, j: j - 1 };
            top_right = { i: i + 1, j: j - 1 };
            bottom_left = { i: i, j: j + 1 };
            bottom_right = { i: i + 1, j: j + 1 };
        }
        let neighbours = [];
        neighbours[0] = left;
        neighbours[1] = top_left;
        neighbours[2] = top_right;
        neighbours[3] = right;
        neighbours[4] = bottom_right;
        neighbours[5] = bottom_left;
        return neighbours;
    }

    preload(): void {
        let textureScale = this.r / data.catStepLength;
        for (let key in data.textures) {
            this.load.addFile(new RawSVGFile(this.load, key, data.textures[key], { scale: textureScale }));
        }
    }

    create(): void {
        this.createAnimations();
        this.createBlocks();
        this.createCat();
        this.createStatusText();
        this.createResetButton();
        this.createCreditText();
        this.reset();
        if (this.game.solver) {
            this.cat.solver = this.game.solver;
        }
    }

    getPosition(i: number, j: number): NeighbourData {
        return {
            x: this.r * 3 + ((j & 1) === 0 ? this.r : this.dx) + i * this.dx,
            y: this.r * 3 + this.r + j * this.dy,
        };
    }

    getBlock(i: number, j: number): Block | null {
        if (!(i >= 0 && i < this.w && j >= 0 && j < this.h)) {
            return null;
        }
        return this.blocks[i][j];
    }

    playerClick(i: number, j: number): boolean {
        if (this.cat.anims.isPlaying) {
            this.cat.anims.stop();
        }
        if (this.state !== GameState.PLAYING) {
            this.setStatusText(_("El juego ha terminado, comienza de nuevo"));
            this.reset();
            return false;
        }
        let block = this.getBlock(i, j);
        if (!block) {
            this.setStatusText(_("Error de código, la posición actual no existe"));
            return false;
        }
        if (block.isWall) {
            this.setStatusText(_("La ubicación del clic ya es un muro, el clic está prohibido"));
            return false;
        }
        if (this.cat.i === i && this.cat.j === j) {
            this.setStatusText(_("La posición del clic es la posición actual del gato, el clic está prohibido"));
            return false;
        }
        block.isWall = true;
        if (this.cat.isCaught()) {
            this.setStatusText(_("El gato no tiene camino a seguir, tú ganas"));
            this.state = GameState.WIN;
            return false;
        }
        this.setStatusText(_("Hiciste clic") + `(${i}, ${j})`);
        let result = this.cat.step();
        if (!result) {
            this.setStatusText(_("¡El gato admite la derrota y tú ganas!"));
            this.state = GameState.WIN;
        }
        return true;
    }








    reset() {
        this.cat.reset();
        this.resetBlocks();
        this.randomWall();
        this.state = GameState.PLAYING;
        this.setStatusText(_("Haz clic en los puntos para rodear al gatito."));
    }

    private setStatusText(message: string) {
        this.statusBar.setText(message);
    }

    private createAnimations(): void {
        data.animations.forEach(animation => {
            let frames: AnimationFrameConfig[] = [];
            animation.textures.forEach(texture => {
                frames.push({
                    key: texture,
                    frame: 0,
                });
            });
            this.anims.create({
                key: animation.name,
                frames: frames,
                frameRate: data.frameRate,
                repeat: animation.repeat,
            });
        });
    }

    private createBlocks(): void {
        let blocks = [];
        for (let i = 0; i < this.w; i++) {
            blocks[i] = [];
            for (let j = 0; j < this.h; j++) {
                let block = new Block(this, i, j, this.r * 0.9);
                blocks[i][j] = block;
                this.add.existing(block);
                block.on("player_click", this.playerClick.bind(this));
            }
        }
        this.blocks = blocks;
    }

    private createCat(): void {
        let cat = new Cat(this);
        cat.on("escaped", () => {
            this.state = GameState.LOSE;
        });
        cat.on("win", () => {
            this.state = GameState.WIN;
        });
        cat.solver = nearestSolver;
        this.cat = cat;
        this.add.existing(cat);
    }

    private createStatusText(): void {
        let statusBar = new StatusBar(this);
        this.statusBar = statusBar;
        this.add.existing(statusBar);
    }

    private createResetButton(): void {
        let resetButton = new ResetButton(this);
        this.add.existing(resetButton);
        resetButton.on("pointerup", () => {
            this.reset();
        });
    }

    private createCreditText(): void {
        let creditText = new CreditText(this);
        this.creditText = creditText;
        this.add.existing(creditText);
    }

    private resetBlocks() {
        this.blocks.forEach(blocks => {
            blocks.forEach(block => {
                block.isWall = false;
            });
        });
    }

    private randomWall() {
        for (let k = 0; k < 8; k++) {
            let i = Math.floor(this.w * Math.random());
            let j = Math.floor(this.h * Math.random());
            if (i !== this.cat.i || j !== this.cat.j) {
                this.getBlock(i, j).isWall = true;
            }
        }
    }
}
