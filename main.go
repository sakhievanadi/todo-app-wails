package main

import (
	"embed"
	"todo-desktop/app"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	myApp := app.NewApp()

	err := wails.Run(&options.App{
		Title:     "Todo Desktop",
		Width:     800,
		Height:    600,
		Assets:    assets,
		OnStartup: myApp.Startup,
		Bind: []interface{}{
			myApp,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
