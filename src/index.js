/**
 * This class is just a facade for your implementation, the tests below are using the `World` class only.
 * Feel free to add the data and behavior, but don't change the public interface.
 */

export class World {
    constructor() {}

    createPowerPlant() {
        return {
            id: generateId(),
            status: 'alive',
        };
    }

    createHousehold() {
        return {
            id: generateId(),
            connections: [], // a collection of PowerPlants Connected
        };
    }

    connectHouseholdToPowerPlant(household, powerPlant) {
        household.connections.push(powerPlant);
    }

    connectHouseholdToHousehold(household1, household2) {
        const uniqueArr = [
            ...household1.connections,
            ...household2.connections,
        ].filter(
            (item, i, arr) => i === arr.findIndex(({ id }) => id === item.id)
        ); // a collection of unique PowerPlants Connected

        household1.connections = uniqueArr;
        household2.connections = uniqueArr;
    }

    disconnectHouseholdFromPowerPlant(household, powerPlant) {
        household.connections.forEach((item) => {
            if (item.id === powerPlant.id) {
                item.status = 'disconnected';
            }
        });
    }

    killPowerPlant(powerPlant) {
        powerPlant.status = 'dead';
    }

    repairPowerPlant(powerPlant) {
        powerPlant.status = 'alive';
    }

    householdHasEletricity(household) {
        return household.connections.some(({ status }) => status === 'alive');
    }
}

function generateId() {
    return (Math.random() + 1).toString(36).substring(6);
}
