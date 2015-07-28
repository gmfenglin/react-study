package com.example.demo;

public class Runner implements IRunner {
	private IComputer computer;

	public IComputer getComputer() {
		return computer;
	}

	public void setComputer(IComputer computer) {
		this.computer = computer;
	}

	@Override
	public void print() {
		computer.sys();

	}
}
