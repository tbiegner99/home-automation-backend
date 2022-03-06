import moment from 'moment';
import { Filters } from '../config/constants/readings.js';

const undefinedIfNull = (value) => (value === null ? undefined : value);

class ReadingsRowMapper {
    toInsertZoneParams(zone) {
        return {
            date: moment().toDate(),
            name: zone.name,
            description: zone.description,
        };
    }

    toInsertHumidityReading(reading) {
        return {
            readingId: reading.id,
            humidity: reading.humidity,
        };
    }

    toInsertTemperatureReading(reading) {
        return {
            readingId: reading.id,
            temperature: reading.temperature,
        };
    }

    toParamsForSelect(zone, type, filter, filterParams) {
        const baseParams = {
            zone,
            type,
        };
        switch (filter) {
            case Filters.CUSTOM:
                return {
                    ...baseParams,
                    startDate: filterParams.startDate,
                    endDate: filterParams.endDate,
                };
            default:
                return baseParams;
        }
    }

    fromReadings(reading) {
        return {
            id: reading.id,
            zone: reading.zone,
            date: reading.date,
            temperature: undefinedIfNull(reading.temperature),
            humidity: undefinedIfNull(reading.humidity),
        };
    }

    fromZone(zone) {
        return {
            name: zone.zone,
            description: zone.zone,
            dateAdded: zone.date_added,
        };
    }
}

export default new ReadingsRowMapper();
