export class Definition {
  text: string
  showEdit: boolean

  constructor(text: string) {
    this.text = text
    this.showEdit = false
  }

  toggleShowEdit(): boolean {
    this.showEdit = !this.showEdit
    return this.showEdit
  }
}
