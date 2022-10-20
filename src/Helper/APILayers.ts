import { ApiMockResponse } from "../ApiMockData/dummyData";
import { IBoard } from "../Interfaces/Kanban";

const LocalStorageKeyName = "kanban-boards";
export class BoardAPI {
  async fetchBoardList(): Promise<IBoard[]> {
    const apiData: IBoard[] = ApiMockResponse;
    let BoardList: IBoard[] = [];
    // добавляем mock-данные, если local storage пуст
    if (localStorage.getItem(LocalStorageKeyName)) {
      const localStorageData: IBoard[] = JSON.parse(
        localStorage.getItem(LocalStorageKeyName) ?? "",
      );
      BoardList = [...localStorageData];
    } else {
      BoardList = [...apiData];
      updateLocalStorageBoards(BoardList);
    }

    return BoardList;
  }
}

export async function fetchBoardList(): Promise<IBoard[]> {
  const api = new BoardAPI();
  return api.fetchBoardList();
}
export function updateLocalStorageBoards(boards: IBoard[]) {
  localStorage.setItem(LocalStorageKeyName, JSON.stringify(boards));
}
