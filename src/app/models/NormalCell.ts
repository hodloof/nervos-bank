export class BaseCell {
    group: string;
    symbol: string = "";
    cell_type: string = "normal";
    tx_hash: string = "";
    cell_index: number = 0;
    block_number: string = "";
    block_timestamp: string = "";
    capacity: string = "";
    occupied_capacity: string = "";
    data: string = "0x";

    balance: number = 0;
    balanceStr: string = "0"; // UI
    grade: number = 0; // indicate for 3 levels of 1~3 / 3~5 / 5+ years
    selected: boolean = false; // UI
    last_claimed_at: number = -1; // 上一次领取的时间

    constructor(group: string) {
        this.group = group;
    }
}

export class CKBCell extends BaseCell {
    constructor() {
        super("Normal");
        this.symbol = "CKB";
    }
}

// export class TypeScript {
//     args: string;
//     code_hash: string;
//     hash_type: string;

//     constructor(args: string, code_hash: string, hash_type: string) {
//         this.args = args;
//         this.code_hash = code_hash;
//         this.hash_type = hash_type;
//     }
// }

export class XUDTCell extends BaseCell {
    type: string = "xudt";
    //type_script: TypeScript = new TypeScript("0x", "0x", "data");
    
    // constructor(args: string, code_hash: string, hash_type: string) {
    //     super();
    //     this.type_script = new TypeScript(args, code_hash, hash_type);
    // }

    constructor(group: string){
        super(group);
    }
}

export class DAOCell extends BaseCell {
    constructor(){
        super("Nervos DAO");
        this.symbol = "CKB";
        this.cell_type = "nervos_dao_deposit";
    }
}

export class iCKBCell extends XUDTCell {
    constructor() {
        // super("0x753dd7201741ca507bb28bcc9980a783b1e61bf4",
        //     "",
        //     "");
        super("iCKB");
        this.symbol = "iCKB";
    }
}

export class LiveCells {
    grade: number;

    ckbCells: CKBCell[] = [];
    daoCells: DAOCell[] = [];
    ickbCells: iCKBCell[] = [];

    constructor(grade: number = 0) {
        this.grade = grade;
    }

    getAllCells(applyGrade: boolean = true): BaseCell[] {
        if(applyGrade){
            this.ckbCells.forEach(cell => cell.grade = this.grade);
            this.daoCells.forEach(cell => cell.grade = this.grade);
            this.ickbCells.forEach(cell => cell.grade = this.grade);
        }
        return [...this.ckbCells, ...this.daoCells, ...this.ickbCells];
    }

    getCount(): number {
        return this.ckbCells.length + this.daoCells.length + this.ickbCells.length;
    }
}
