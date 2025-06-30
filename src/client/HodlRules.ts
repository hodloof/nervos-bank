import { LiveCells, BaseCell } from "@/app/models/NormalCell";

export class HodlRules {
    private static filterCellsInTimestamp<T extends { block_timestamp: string }>(cells: T[], timeLimit: number): T[] {
        const now = Date.now();
        return cells.filter(cell => {
            const blockTimestamp = parseInt(cell.block_timestamp); // new Date(cell.block_timestamp).getTime();
            return (now - blockTimestamp) < timeLimit;
        });
    }

    private static filterCellsByTimerange<T extends { block_timestamp: string }>(cells: T[], timeLower: number, timeUpper: number): T[] {
        const now = Date.now();
        return cells.filter(cell => {
            const delta = now - parseInt(cell.block_timestamp); // new Date(cell.block_timestamp).getTime();
            return delta >= timeLower && delta < timeUpper;
        });
    }

    private static filterCellsOutTimestamp<T extends { block_timestamp: string }>(cells: T[], timeLimit: number): T[] {
        const now = Date.now();
        return cells.filter(cell => {
            const blockTimestamp = parseInt(cell.block_timestamp); // new Date(cell.block_timestamp).getTime();
            return (now - blockTimestamp) >= timeLimit;
        });
    }

    static getCellsIn1Year(cells: LiveCells): LiveCells {
        const oneYearInMilliseconds = 365 * 24 * 60 * 60 * 1000;
        const result = new LiveCells(0);

        result.ckbCells = this.filterCellsInTimestamp(cells.ckbCells, oneYearInMilliseconds);
        result.daoCells = this.filterCellsInTimestamp(cells.daoCells, oneYearInMilliseconds);
        result.ickbCells = this.filterCellsInTimestamp(cells.ickbCells, oneYearInMilliseconds);

        return result;
    }

    static getCells1to3Years(cells: LiveCells): LiveCells {
        const oneYearInMilliseconds = 365 * 24 * 60 * 60 * 1000;
        const threeYearInMilliseconds = 3 * 365 * 24 * 60 * 60 * 1000;
        const result = new LiveCells(1);

        result.ckbCells = this.filterCellsByTimerange(cells.ckbCells, oneYearInMilliseconds, threeYearInMilliseconds);
        result.daoCells = this.filterCellsByTimerange(cells.daoCells, oneYearInMilliseconds, threeYearInMilliseconds);
        result.ickbCells = this.filterCellsByTimerange(cells.ickbCells, oneYearInMilliseconds, threeYearInMilliseconds);

        return result;
    }

    static getCells3to5Years(cells: LiveCells): LiveCells {
        const threeYearInMilliseconds = 3 * 365 * 24 * 60 * 60 * 1000;
        const fiveYearInMilliseconds = 5 * 365 * 24 * 60 * 60 * 1000;
        const result = new LiveCells(3);

        result.ckbCells = this.filterCellsByTimerange(cells.ckbCells, threeYearInMilliseconds, fiveYearInMilliseconds);
        result.daoCells = this.filterCellsByTimerange(cells.daoCells, threeYearInMilliseconds, fiveYearInMilliseconds);
        result.ickbCells = this.filterCellsByTimerange(cells.ickbCells, threeYearInMilliseconds, fiveYearInMilliseconds);

        return result;
    }

    static getCellsOut5Years(cells: LiveCells): LiveCells {
        const fiveYearInMilliseconds = 5 * 365 * 24 * 60 * 60 * 1000;
        const result = new LiveCells(5);

        result.ckbCells = this.filterCellsOutTimestamp(cells.ckbCells, fiveYearInMilliseconds);
        result.daoCells = this.filterCellsOutTimestamp(cells.daoCells, fiveYearInMilliseconds);
        result.ickbCells = this.filterCellsOutTimestamp(cells.ickbCells, fiveYearInMilliseconds);

        return result;
    }
}