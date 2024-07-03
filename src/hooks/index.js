// index.js
import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, onSnapshot } from "firebase/firestore";

// Hook to get todos
export const useTodos = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, "todos"),
            (snapshot) => {
                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setTodos(data);
            }
        );

        return () => {
            unsubscribe();
        };
    }, []);

    return todos;
}

// Hook to get projects
export const useProjects = (todos) => {
    const [projects, setProjects] = useState([]);

    const calculateNumOfTodos = (projectName, todos) => {
        return todos.filter(todo => todo.project === projectName).length;
    }

    useEffect(() => {
        const projectsCollection = collection(db, 'projects');

        const unsubscribe = onSnapshot(projectsCollection, (snapshot) => {
            const data = snapshot.docs.map((doc) => {
                const projectName = doc.data().name;

                return {
                    id: doc.id,
                    name: projectName,
                    numOfTodos: calculateNumOfTodos(projectName, todos),
                };
            });
            setProjects(data);
        });

        return () => {
            unsubscribe();
        };
    }, [todos]);  // Adding todos as dependency to rerun effect when todos change

    return projects;
}
