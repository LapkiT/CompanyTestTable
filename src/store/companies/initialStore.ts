import { Company } from "./types";

export const initStore: Company[] = [
    {
        "id": "a1b2c3d4e5f6",
        "name": "Skyline Builders",
        "address": "Новосибирск, ул. Кирова, д. 19",
        "employees": [
            {"id": "e1f2g3h4", "lastName": "Иванов", "firstName": "Андрей", "position": "Инженер"},
            {"id": "e5f6g7h8", "lastName": "Петров", "firstName": "Сергей", "position": "Архитектор"},
            {"id": "e9f0g1h2", "lastName": "Сидоров", "firstName": "Николай", "position": "Прораб"}
        ]
    },
    {
        "id": "b2c3d4e5f6g7",
        "name": "Tech Innovators",
        "address": "Москва, ул. Красная Пресня, д. 7",
        "employees": [
            {"id": "f2g3h4i5", "lastName": "Кузнецов", "firstName": "Олег", "position": "Разработчик"},
            {"id": "f6g7h8i9", "lastName": "Морозова", "firstName": "Елена", "position": "Менеджер"}
        ]
    },
    {
        "id": "c3d4e5f6g7h8",
        "name": "Green Energy Solutions",
        "address": "Санкт-Петербург, пр. Ветеранов, д. 5",
        "employees": [
            {"id": "g3h4i5j6", "lastName": "Смирнов", "firstName": "Алексей", "position": "Технолог"},
            {"id": "g7h8i9j0", "lastName": "Попова", "firstName": "Наталья", "position": "Бухгалтер"}
        ]
    },
    {
        "id": "d4e5f6g7h8i9",
        "name": "Creative Design Hub",
        "address": "Екатеринбург, ул. Ленина, д. 10",
        "employees": [
            {"id": "h4i5j6k7", "lastName": "Соколов", "firstName": "Дмитрий", "position": "Дизайнер"},
            {"id": "h8i9j0k1", "lastName": "Васильева", "firstName": "Мария", "position": "Аналитик"}
        ]
    },
    {
        "id": "e5f6g7h8i9j0",
        "name": "Future Tech Group",
        "address": "Казань, ул. Баумана, д. 3",
        "employees": [
            {"id": "i5j6k7l8", "lastName": "Зайцев", "firstName": "Павел", "position": "Системный администратор"},
            {"id": "i9j0k1l2", "lastName": "Федорова", "firstName": "Анна", "position": "Программист"}
        ]
    }
]