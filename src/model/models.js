const { DataTypes } = require('sequelize');
//Conexão com o banco de dados 
const database = require('../config/database');
//Todos os modelos de entidades 
const Estadio = database.define('Estadio', {
    idestadio: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
}, {
    tableName: 'estadio',
    timestamps: false
});
const Cronometro = database.define('Cronometro', {
    id_cronometro: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipo_cronometro: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    minuto: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    segundo: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    icone: {
        type: DataTypes.BLOB,
        allowNull: true
    },
    id_placar: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Placar',
            key: 'id_placar',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    },
    duracao: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'Cronometro',
    timestamps: false
});
const Jogador = database.define('Jogador', {
    id_jogador: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    numero: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    posicao: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    foto: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    titular: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    id_equipe: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Time',
            key: 'id_equipe',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    }
}, {
    tableName: 'jogador',
    timestamps: false // Se você não estiver rastreando timestamps de criação/atualização
});
const Jogo = database.define('Jogo', {
    idjogo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    data: {
        type: DataTypes.STRING,
        allowNull: true
    },
    id_equipe1: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Time',
            key: 'id_equipe',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    },
    id_equipe2: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Time',
            key: 'id_equipe',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    },
    pontos_time1: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    partida: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    pontos_time2: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    idestadio: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Estadio',
            key: 'idestadio',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    },
    id_categoria: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Categoria',
            key: 'id_categoria',
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL'
        }
    },
    nome_time1:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    nome_time2:{
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    tableName: 'Jogo',
    timestamps: false
});
const Categoria = database.define('Categoria', {
    id_categoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    sexo:{
        type:DataTypes.INTEGER,
        allowNull: true,
    },
    nome:{
        type:DataTypes.STRING,
        allowNull: true,
    }
}, {
    tableName: 'Categoria',
    timestamps: false
});
const Placar = database.define('Placar', {
    id_placar: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idjogo: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Jogo',
            key: 'idjogo',
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL'
        }
    },
    id_transmissao: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: 'Transmissao',
            key: 'id_transmissao',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    },
    placar_visibilidade: {
        type: DataTypes.BLOB,
        allowNull: true,
    },
    placar_x: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    placar_y: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    placar_z: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    tableName: 'Placar',
    timestamps: false
});
const Rotativo = database.define('Rotativo', {
    id_rotativo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    rotativo_visibilidade: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    rotativo_x: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    rotativo_y: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    rotativo_z: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    id_transmissao: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Transmissao',
            key: 'id_transmissao',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    }
}, {
    tableName: 'Rotativo',
    timestamps: false
});
const Time = database.define('Times', {
    id_equipe: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_categoria: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Categoria',
            key: 'id_categoria',
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL'
        }
    }
});
const Transmissao = database.define('Transmissao', {
    id_transmissao: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
}, {
    tableName: 'Transmissao',
    timestamps: false
});
const Imagem = database.define('Imagem', {
    id_imagem: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    url: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    duracao: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ativo: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: 'Imagem',
    timestamps: false
});
const Merchan = database.define('Merchan', {
    id_merchan: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    url: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    ativo: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: 'Merchan',
    timestamps: false
});
const Overlay = database.define('Overlay', {
    id_overlay: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    overlay_visibilidade: {
        type: DataTypes.STRING,
        allowNull: true
    },
    fundo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    id_transmissao: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Transmissao',
            key: 'id_transmissao',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    }
}, {
    tableName: 'Overlay',
    timestamps: false
});
const Logo = database.define('Logo', {
    id_logo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    logo_visibilidade: {
        type: DataTypes.STRING,
        allowNull: true
    },
    logo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    id_transmissao: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Transmissao',
            key: 'id_transmissao',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    },
    logo_x: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    logo_y: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    logo_z: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    tableName: 'Logo',
    timestamps: false
});
<<<<<<< HEAD
<<<<<<< HEAD
const Link = database.define('Link', {
    id_Link: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Link_visibilidade: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Link: {
        type: DataTypes.STRING,
        allowNull: true
    },
    id_transmissao: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Transmissao',
            key: 'id_transmissao',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    },
    Link_x: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    Link_y: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    Link_z: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    Link_play: {
        type: DataTypes.BLOB,
        allowNull: true,
    },
    Link_nome: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    
}, {
    tableName: 'Link',
    timestamps: false
});
=======

>>>>>>> parent of d110e5f (alteraçoes de sabado 09/06)
=======

>>>>>>> parent of d110e5f (alteraçoes de sabado 09/06)
module.exports = {
    Transmissao,
    Time,
    Rotativo,
    Placar,
    Jogo,
    Jogador,
    Estadio,
    Cronometro,
    Imagem,
    Merchan,
    Overlay,
<<<<<<< HEAD
<<<<<<< HEAD
    Logo,
    Link
=======
=======
>>>>>>> parent of d110e5f (alteraçoes de sabado 09/06)
    Categoria,
    Logo
>>>>>>> parent of d110e5f (alteraçoes de sabado 09/06)
}