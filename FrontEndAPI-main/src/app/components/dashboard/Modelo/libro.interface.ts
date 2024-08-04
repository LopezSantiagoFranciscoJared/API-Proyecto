export interface libro {
    id: number;
    titulo: string;
    genero: string;
    aniopublicacion: number;
    portada: string;
    contraportada: string;
    ISBN: string;
    created_at: string;
    updated_at: string;
    autor_id: number;
    autor?: {
      id: number;
      nombre: string;
    };
  }
  