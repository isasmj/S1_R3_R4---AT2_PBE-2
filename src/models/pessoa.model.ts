export interface IPessoa {
    mostrarDados(): string;
}

export abstract class Pessoa implements IPessoa {
    private _nome: string;
    private _email: string;
    constructor(nome: string, email: string) {
        this._nome = nome;
        this._email = email;
    }
    public get nome(): string { return this._nome; }
    public get email(): string { return this._email; }

    public mostrarDados(): string {
        return ` Nome ${this._nome}, Email ${this._email}`;
    }
}

export class Professor extends Pessoa {
    private _disciplina: string;
    private _cargaHoraria: number;
    constructor(
        nome: string,
        email: string,
        disciplina: string,
        cargaHoraria: number
    ) {
        super(nome, email);
        this._disciplina = disciplina;
        this._cargaHoraria = cargaHoraria;
    }

    public get disciplina(): string { return this._disciplina; }
    public get cargaHoraria(): number { return this._cargaHoraria; }
    public mostrarDados(): string {
        return `${super.mostrarDados()}, disciplina ${this._disciplina}, carga horária ${this._cargaHoraria}`;
    }
    public inserir(): Professor {
        console.log("Professor inserido com sucesso.");
        return this;
    }
    public alterar(): Professor {
        console.log("Dados do professor alterados.");
        return this;
    }
}

export class Aluno extends Pessoa {
    private _matricula: string;
    private _curso: string;
    private _mediaFinal: number;
    constructor(
        nome: string,
        email: string,
        matricula: string,
        curso: string,
        mediaFinal: number
    ) {
        super(nome, email);
        this._matricula = matricula;
        this._curso = curso;
        this._mediaFinal = mediaFinal;
    }

    public get matricula(): string { return this._matricula; }
    public get curso(): string { return this._curso; }
    public get mediaFinal(): number { return this._mediaFinal; }
    public mostrarDados(): string {
        return `${super.mostrarDados()}, matrícula ${this._matricula}, curso ${this._curso}, média final ${this._mediaFinal}`;
    }
    public inserir(): Aluno {
        console.log("Aluno inserido com sucesso.");
        return this;
    }
    public alterar(): Aluno {
        console.log("Dados do aluno alterados.");
        return this;
    }
     public estaAprovado(): boolean {
        return this._mediaFinal >= 6;
    }
}

