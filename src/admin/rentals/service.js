const { findAll, findPending, create, activate, findActives, findOnePackId, findOneDropOff, findInactives, desactivate, findOne, findPendingById, findActivesById } = require('./database')

class Service {
  findAll() {
    return findAll();
  }

  findOne(userId) {
    return findOne(userId);
  }

  create(userId, packId) {
    return create(userId, packId)
  }

  findPending(rentalId) {
    if (rentalId) {
      return findPendingById(rentalId)
    }
    return findPending();
  }

  findActives(rentalId) {
    if (rentalId) {
      return findActivesById(rentalId);
    }
    return findActives();
  }

  findInactives() {
    return findInactives();
  }

  activate(rentalData) {
    return activate(rentalData);
  }

  desactivate(rentalData) {
    return desactivate(rentalData)
  }

  // Métodos auxiliares
  getDropDate(today, packPeriod) {
    let drop_day = new Date(today);

    switch (packPeriod) {
      case 'Passe Diário':
        drop_day.setDate(drop_day.getDate() + 1)
        break;
      case 'Plano Semanal':
        drop_day.setDate(drop_day.getDate() + 7)
        console.log('semanal')
        break;
      case 'Plano Mensal':
        drop_day.setMonth(drop_day.getMonth() + 1)
        console.log('mensal')
        break;
      case 'Plano Anual':
        drop_day.setFullYear(drop_day.getFullYear() + 1)
        console.log('anual')
        break;
    }
    return drop_day
  }

  getDelayDays(drop_off, today) {

    const now = new Date(today); // Data de hoje (actual_drop)
    const past = new Date(drop_off); // Data no passado (drop_off) 
    const diff = now.getTime() - past.getTime(); // Subtrai uma data pela outra
    let days = Math.ceil(diff / (1000 * 60 * 60 * 24)); // Divide o total pelo total de milisegundos correspondentes a 1 dia.

    // Se days for negativo, o cliente entregou antes do prazo
    if (days < 0) {
      days = 0
    }
    return days
  }

  getFine(days, packPrice) {
    // A multa por dia será 10% do valor do plano contratado
    const fine = days * (Number(packPrice) * 0.1)
    return fine
  }
}

const RentalService = new Service();
module.exports = RentalService;
