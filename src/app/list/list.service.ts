import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { List } from './list.model';
import { UIService } from '../shared/ui.service';

@Injectable()
export class ListService {

    // ALL CREATED LISTS AND THE OBSERVABLE TO SUBSCRIBE TO IT
    showLists = new Subject<List[]>();
    private createdLists: List[] = [];


    // THE CURRENTLY SELECTED LIST AND THE OBSERVABLE TO SUBSCRIBE TO IT
    showCurrentList = new Subject<List>();
    private currentList: List;

    
    constructor(
        private router: Router, 
        private uiService: UIService, 
        private db: AngularFirestore, 
        private afAuth: AngularFireAuth
    ) {}

    // WORK AROUND AUTHENTICATION FOR DEMONTRATION PURPOSES. FIREBASE IS LOCKED DOWN WITHOUT IT
    autoLogin() {
        const email = 'test@test.com';
        const password = 'testPW';

        this.afAuth.auth.signInWithEmailAndPassword(email, password);
    }




    initListDisplays() {
        const lists = this.createdLists;
        if (lists.length > 0 && this.uiService.getFirstTimeUse() === true) {
            this.uiService.setFirstTimeUse();
            this.viewSelectedList(lists.length - 1);
        }
    }

    // THIS METHOD WILL GET THE LISTS FROM FIRESTORE CLOUD AND ASSIGN THEN TO THE CREATEDLISTS ARRAY ABOVE
    fetchAvailableLists() {
        this.db.collection('taskList').snapshotChanges()
          .pipe(map(listArr => {
    
            listArr.sort((a, b) => (a.payload.doc.data()['date'] > 
              b.payload.doc.data()['date']) ? 1 : -1);
    
            return listArr.map(list => {
              return {
                date: list.payload.doc.data()['date'], 
                title: list.payload.doc.data()['title'], 
                color: list.payload.doc.data()['color'], 
                id: list.payload.doc.id, 
                list: list.payload.doc.data()['list']
              }
            })
          }))
          .subscribe((lists: List[]) => {
            this.createdLists = lists;
            this.showLists.next([...this.createdLists]);
          });
    }


    // CREATES A NEW LIST WHEN THE SAVE BUTTON IS SELECTED IN THE NEW LIST MENU
    createNewList(data: {name: string, color: string}) {
        const newList = {
            date: new Date(), 
            title: data.name, 
            color: data.color, 
            list: []
        };

        this.db.collection('taskList').add(newList)
            .then(() => {
                this.viewSelectedList(this.createdLists.length - 1);
            });
    }


    // CALLED WHEN THE CANCEL BUTTON FOR THE NEW LIST MENU IS SELECTED
    // WILL REDIRECT USER TO THE CURR LIST OR WELCOME SCREEN
    newListCancel() {
        const list = this.currentList;
        const lists = this.createdLists;
        const index = lists.findIndex(x => x.title === list.title);

        lists.length != 0 ? this.viewSelectedList(index) :
            this.router.navigate(['/welcome']);
    }


    // SETS A LIST TO THE CURRENT LIST PROPERTY SO IT CAN BE VIEWED
    viewSelectedList(index: number) {
        this.currentList = this.createdLists[index];
        this.uiService.getContrast(this.currentList.color);
        this.showCurrentList.next({ ...this.currentList });
        this.router.navigate(['/list', `${this.createdLists.indexOf(this.currentList)}-${this.currentList.title}`]);
    }


    // DELETES LISTS FROM SIDE NAV
    // WILL REDIRECT USER TO MOST RECENTLY CREATED LIST IF THE LIST BEING DELETED IS THE CURR LIST
    deleteLists(index: number) {

        if (this.listCompare(index)) {
            this.db.doc('taskList/' + this.createdLists[index].id).delete();
        } else {
            if (this.createdLists.length > 1) {
                this.createdLists[index] != this.createdLists[0] ? 
                    this.viewSelectedList(index - 1) : this.viewSelectedList(index + 1);
                this.db.doc('taskList/' + this.createdLists[index].id).delete();
            } else {
                this.db.doc('taskList/' + this.createdLists[index].id).delete();
                this.uiService.resetColor();
                this.router.navigate(['/welcome']);
            }
        }

    }


    // THIS WILL ADD TO THE CURRENT LIST'S ARRAY
    addTasksToLists(task: string) {
        const currList = this.currentList;
        const taskObj = { task: task, completed: false };
        currList.list.push(taskObj);

        this.db.doc('taskList/' + currList.id).update({list: currList.list});
    }


    // THIS WILL SAVE A CHECKED TASK WITHIN THE CURRENT LIST'S ARRAY 
    // BY SETTING IT'S COMPLETED PROPERTY TO TRUE OR FALSE
    checkedUncheckedTask(data: {item: number, selected: boolean}) {
        const currList = this.currentList;
        currList.list[data.item].completed = data.selected;

        this.db.doc('taskList/' + currList.id).update({list: currList.list});
    }


    // DELETES TASK ITEMS FROM A LIST
    deleteTasks(index: number) {
        this.currentList.list.splice(index, 1);

        this.db.doc('taskList/' + this.currentList.id)
            .update({list: this.currentList.list});
    }


    // PROVIDES A COPY OF THE CURRENT LIST THAT SHOULD BE DISPLAYED
    // USED WITHIN THE LIST COMPONENT
    getCurrentList() {
        return { ...this.currentList };
    }


    // SIMPLE UTILITY METHOD TO COMPARE 2 OBJECTS BASED ON TITLE AND COLOR
    // CURRENTLY USED FOR THE DELETE LIST METHOD
    private listCompare(index: number) {
        if (this.createdLists[index].title != this.currentList.title
            && this.createdLists[index].color != this.currentList.color) {

            return true;
        }
    }
}