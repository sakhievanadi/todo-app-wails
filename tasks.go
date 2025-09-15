package main

import (
	"encoding/json"
	"os"
)

type Task struct {
	ID        int    `json:"id"`
	Title     string `json:"title"`
	Completed bool   `json:"completed"`
}

type TaskService struct {
	FilePath string
}

func NewTaskService(path string) *TaskService {
	return &TaskService{FilePath: path}
}

func (t *TaskService) LoadTasks() ([]Task, error) {
	data, err := os.ReadFile(t.FilePath)
	if err != nil {
		return []Task{}, nil
	}
	var tasks []Task
	json.Unmarshal(data, &tasks)
	return tasks, nil
}

func (t *TaskService) SaveTasks(tasks []Task) error {
	data, err := json.MarshalIndent(tasks, "", "  ")
	if err != nil {
		return err
	}
	return os.WriteFile(t.FilePath, data, 0644)
}
